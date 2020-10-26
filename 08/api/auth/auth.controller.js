const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const UserModel = require('./auth.model');
const { NotFoundError, UnauthorizedError, InvalidUserInput } = require('../error');

class AuthController {

    async sighUpUser(req, res, next) {
        try {
            const user = await UserModel.create(req.body);

            await AuthController.sendVerificationEmail(user);

            return res.send({ email: user.email });
        } catch(err) {
            next(err);
        }
    }

    async verifyEmail(req, res, next) {
        try {
            const verificationToken = req.params.token;

            const userToVerify = await UserModel.findOne({ verificationToken });

            if (!userToVerify) {
                throw new NotFoundError('User was not found');
            }

            await AuthController.verifyUser(userToVerify._id);

            return res.send({ message: 'User was verified' });
        } catch(err) {
            next(err);
        }
    }

    async signInUser(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new NotFoundError('User was not found');
            }

            if (user.password !== password) {
                throw new InvalidUserInput('Password does not match');
            }

            if (user.status !== 'verified') {
                throw new UnauthorizedError('User was not verified');
            }

            return res.send({ token: '1ge8r97g4s512d.a84dw8e94f1asd.541a89d4' });
        } catch(err) {
            next(err);
        }
    }

    static async sendVerificationEmail(user) {
        const verificationToken = await AuthController.saveVerifcationToken(user._id);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD,
            }
        });

        const verificationUrl = `http://localhost:3000/auth/verify/${verificationToken}`;

        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: user.email,
            subject: 'Email Verification',
            html: `<!doctype html>
            <html>
              <head>
                <meta charset="utf-8">
              </head>
              <body>
                <p>Image: <img src="https://images.wallpaperscraft.ru/image/more_pena_voda_191042_1440x900.jpg"/></p>
            </html>`
        };

        return transporter.sendMail(mailOptions);

    }

    static async saveVerifcationToken(userId) {
        const token = uuidv4();

        const { verificationToken } = await UserModel.findByIdAndUpdate(userId, {
            verificationToken: token
        }, { new: true });

        return verificationToken;
    }

    static async verifyUser(userId) {
        await UserModel.findByIdAndUpdate(userId, {
            status: 'verified',
            verificationToken: null,
        });

        return 'success';
    }

}

module.exports = new AuthController();