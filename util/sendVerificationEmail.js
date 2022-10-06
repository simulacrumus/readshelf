const sendEmail = require('./sendGridSendEmail')

exports.sendVerificationEmail = async ({ user, verification }) => {
    const html = `
        <div>
            <h3>Hi, ${user.firstName}! Welcome to Read Shelf</h3>
                <p>
                    Please click 
                    <a href="${process.env.APP_BASE_URI}/verify-email?verification=${verification}" target="_blank">here</a> 
                    to confirm your email!
                </p>
        </div>
    `
     await sendEmail({
         to: user.enail,
         from: `emrahkinay@gmail.com`,
         subject: `Verify Your Email Address`,
         text: `Welcome to ReadShelf`,
         html
     }).then(res =>
        console.log("email verification sent")
     )
}