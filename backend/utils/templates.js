function otpTemplate(name, otp) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Static Template</title>
    
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style="
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
          font-size: 14px;
        "
      >
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            padding: 45px 30px 60px;
            background: #1c1c1c;
            background-repeat: no-repeat;
            background-size: 800px 452px;
            background-position: top center;
            font-size: 14px;
            color: #434343;
          "
        >
          <header>
            <table style="width: 100%">
              <tbody>
                <tr style="height: 0">
                  <td>
                    <svg
                      style="height: 100"
                      id="eoyaUvbgErV1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 300 300"
                      shape-rendering="geometricPrecision"
                      text-rendering="geometricPrecision"
                    >
                      <ellipse
                        rx="169.778634"
                        ry="158.950915"
                        transform="matrix(.847789 0 0 0.897367 156.063523 150)"
                        fill="#1c1c1c"
                        stroke-width="0"
                      />
                      <text
                        dx="0"
                        dy="0"
                        font-family='"eoyaUvbgErV1:::Lora"'
                        font-size="90"
                        text-decoration="line-through"
                        font-weight="700"
                        transform="matrix(1.619957 0 0 2.034495 58.526736 216.88345)"
                        fill="#3ecf8e"
                        stroke-width="0"
                      >
                        <tspan y="0" font-weight="700" stroke-width="0">
                          <![CDATA[ TC ]]>
                        </tspan>
                      </text>
                      <style>
                        <![CDATA[
                                            @font-face {font-family: 'eoyaUvbgErV1:::Lora';font-style: normal;font-weight: 700;src: url(data:font/ttf;charset=utf-8;base64,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) format('truetype');}
                                            ]]>
                      </style>
                    </svg>
                  </td>
                  <td style="text-align: right">
                    <span style="font-size: 30px; line-height: 35px; weight: 800; color: #3ECF8E"
                      >Terminal Connect</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </header>
    
          <main>
            <div
              style="
                margin: 0;
                margin-top: 70px;
                padding: 92px 30px 115px;
                background: #c2ebce;
                border-radius: 30px;
                text-align: center;
              "
            >
              <div style="width: 100%; max-width: 489px; margin: 0 auto">
                <h1
                  style="
                    margin: 0;
                    font-size: 24px;
                    font-weight: 500;
                    color: #1f1f1f;
                  "
                >
                  Your OTP
                </h1>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-size: 16px;
                    font-weight: 500;
                  "
                >
                  Hey ${name},
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-weight: 500;
                    letter-spacing: 0.56px;
                  "
                >
                  Thank you for choosing Terminal Connect. Use the following OTP
                  to complete the procedure to Sign Up. OTP is
                  valid for
                  <span style="font-weight: 800; color: #1f1f1f">5 minutes</span>.
                  Do not share this code with others.
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 60px;
                    font-size: 40px;
                    font-weight: 600;
                    letter-spacing: 25px;
                    color: #1c1c1c;
                  "
                >
                  ${otp}
                </p>
              </div>
            </div>
    
            <p
              style="
                max-width: 400px;
                margin: 0 auto;
                margin-top: 90px;
                text-align: center;
                font-weight: 500;
                color: #8c8c8c;
              "
            >
              Need help? Ask at
              <a
                href="mailto:tc@shivamk.tech"
                style="color: #3ECF8E; text-decoration: none"
                >tc@shivamk.tech</a
              >
            </p>
          </main>
    
          <footer
            style="
              width: 100%;
              max-width: 490px;
              margin: 20px auto 0;
              text-align: center;
              border-top: 1px solid #e6ebf1;
            "
          >
            <p
              style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #3ECF8E;
              "
            >
              Terminal Connect
            </p>
    
            <p style="margin: 0; margin-top: 16px; color: #434343">
              Copyright © 2024 Terminal COnnect. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
    
    `;
}
function PaymentSubmitTemplate(username) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Static Template</title>
    
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style="
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
          font-size: 14px;
        "
      >
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            padding: 45px 30px 60px;
            background: #1c1c1c;
            background-repeat: no-repeat;
            background-size: 800px 452px;
            background-position: top center;
            font-size: 14px;
            color: #434343;
          "
        >
          <header>
            <table style="width: 100%">
              <tbody>
                <tr style="height: 0">
                  <td>
                    <svg
                      style="height: 100"
                      id="eoyaUvbgErV1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 300 300"
                      shape-rendering="geometricPrecision"
                      text-rendering="geometricPrecision"
                    >
                      <ellipse
                        rx="169.778634"
                        ry="158.950915"
                        transform="matrix(.847789 0 0 0.897367 156.063523 150)"
                        fill="#1c1c1c"
                        stroke-width="0"
                      />
                      <text
                        dx="0"
                        dy="0"
                        font-family='"eoyaUvbgErV1:::Lora"'
                        font-size="90"
                        text-decoration="line-through"
                        font-weight="700"
                        transform="matrix(1.619957 0 0 2.034495 58.526736 216.88345)"
                        fill="#3ecf8e"
                        stroke-width="0"
                      >
                        <tspan y="0" font-weight="700" stroke-width="0">
                          <![CDATA[ TC ]]>
                        </tspan>
                      </text>
                      <style>
                        <![CDATA[
                                            @font-face {font-family: 'eoyaUvbgErV1:::Lora';font-style: normal;font-weight: 700;src: url(data:font/ttf;charset=utf-8;base64,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) format('truetype');}
                                            ]]>
                      </style>
                    </svg>
                  </td>
                  <td style="text-align: right">
                    <span style="font-size: 30px; line-height: 35px; weight: 800; color: #3ECF8E"
                      >Terminal Connect</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </header>
    
          <main>
            <div
              style="
                margin: 0;
                margin-top: 70px;
                padding: 92px 30px 115px;
                background: #c2ebce;
                border-radius: 30px;
                text-align: center;
              "
            >
              <div style="width: 100%; max-width: 489px; margin: 0 auto">
                <h1
                  style="
                    margin: 0;
                    font-size: 24px;
                    font-weight: 500;
                    color: #1f1f1f;
                  "
                >
                  Details Submitted
                </h1>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-size: 16px;
                    font-weight: 500;
                  "
                >
                  Hey @${username},
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-weight: 500;
                    letter-spacing: 0.56px;
                  "
                >
                  Thank you for choosing Terminal Connect. Your Payment request has been successfully submitted
                  and will be processed within 12 hours,
                  and you will be notified via email.                  
                </p>
                <p>
                  Incase of any queries and payment processing delay, please reach out to us at <a href="mailto:tc@shivamk.tech" style="color: #3ECF8E; text-decoration: none">
                </p>
              </div>
            </div>
    
            <p
              style="
                max-width: 400px;
                margin: 0 auto;
                margin-top: 90px;
                text-align: center;
                font-weight: 500;
                color: #8c8c8c;
              "
            >
              Need help? Ask at
              <a
                href="mailto:tc@shivamk.tech"
                style="color: #3ECF8E; text-decoration: none"
                >tc@shivamk.tech</a
              >
            </p>
          </main>
    
          <footer
            style="
              width: 100%;
              max-width: 490px;
              margin: 20px auto 0;
              text-align: center;
              border-top: 1px solid #e6ebf1;
            "
          >
            <p
              style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #3ECF8E;
              "
            >
              Terminal Connect
            </p>
    
            <p style="margin: 0; margin-top: 16px; color: #434343">
              Copyright © 2024 Terminal COnnect. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
    
    `;
}
function PaymentApprovedTemplate(username) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Static Template</title>

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style="
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
          font-size: 14px;
        "
      >
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            padding: 45px 30px 60px;
            background: #1c1c1c;
            background-repeat: no-repeat;
            background-size: 800px 452px;
            background-position: top center;
            font-size: 14px;
            color: #434343;
          "
        >
          <header>
            <table style="width: 100%">
              <tbody>
                <tr style="height: 0">
                  <td>
                    <svg
                      style="height: 100"
                      id="eoyaUvbgErV1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 300 300"
                      shape-rendering="geometricPrecision"
                      text-rendering="geometricPrecision"
                    >
                      <ellipse
                        rx="169.778634"
                        ry="158.950915"
                        transform="matrix(.847789 0 0 0.897367 156.063523 150)"
                        fill="#1c1c1c"
                        stroke-width="0"
                      />
                      <text
                        dx="0"
                        dy="0"
                        font-family='"eoyaUvbgErV1:::Lora"'
                        font-size="90"
                        text-decoration="line-through"
                        font-weight="700"
                        transform="matrix(1.619957 0 0 2.034495 58.526736 216.88345)"
                        fill="#3ecf8e"
                        stroke-width="0"
                      >
                        <tspan y="0" font-weight="700" stroke-width="0">
                          <![CDATA[ TC ]]>
                        </tspan>
                      </text>
                      <style>
                        <![CDATA[
                                            @font-face {font-family: 'eoyaUvbgErV1:::Lora';font-style: normal;font-weight: 700;src: url(data:font/ttf;charset=utf-8;base64,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) format('truetype');}
                                            ]]>
                      </style>
                    </svg>
                  </td>
                  <td style="text-align: right">
                    <span style="font-size: 30px; line-height: 35px; weight: 800; color: #3ECF8E"
                      >Terminal Connect</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </header>
    
          <main>
            <div
              style="
                margin: 0;
                margin-top: 70px;
                padding: 92px 30px 115px;
                background: #c2ebce;
                border-radius: 30px;
                text-align: center;
              "
            >
              <div style="width: 100%; max-width: 489px; margin: 0 auto">
                <h1
                  style="
                    margin: 0;
                    font-size: 24px;
                    font-weight: 500;
                    color: #1f1f1f;
                  "
                >
                  Payment Approved
                </h1>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-size: 16px;
                    font-weight: 500;
                  "
                >
                  Hey @${username},
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-weight: 500;
                    letter-spacing: 0.56px;
                  "
                >
                  Thank you for choosing Terminal Connect. Your Payment request has been successfully approved and the credits are added in your account.
                  vist your dashboard to check the credits.

                </p>
                <button style={{ backgroundColor: 'emerald', padding: '10px' }}> Visit DashBoard </button>
                <p>
                  Incase of any queries and payment processing delay, please reach out to us at <a href="mailto:tc@shivamk.tech" style="color: #3ECF8E; text-decoration: none">
                </p>
              </div>
            </div>
    
            <p
              style="
                max-width: 400px;
                margin: 0 auto;
                margin-top: 90px;
                text-align: center;
                font-weight: 500;
                color: #8c8c8c;
              "
            >
              Need help? Ask at
              <a
                href="mailto:tc@shivamk.tech"
                style="color: #3ECF8E; text-decoration: none"
                >tc@shivamk.tech</a
              >
            </p>
       </button>   </main>
    
          <footer
            style="
              width: 100%;
              max-width: 490px;
              margin: 20px auto 0;
              text-align: center;
              border-top: 1px solid #e6ebf1;
            "
          >
            <p
              style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #3ECF8E;
              "
            >
              Terminal Connect
            </p>
    
            <p style="margin: 0; margin-top: 16px; color: #434343">
              Copyright © 2024 Terminal COnnect. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
    
    `;
}
function PaymentRejectedTemplate(username, message) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Static Template</title>

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style="
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
          font-size: 14px;
        "
      >
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            padding: 45px 30px 60px;
            background: #1c1c1c;
            background-repeat: no-repeat;
            background-size: 800px 452px;
            background-position: top center;
            font-size: 14px;
            color: #434343;
          "
        >
          <header>
            <table style="width: 100%">
              <tbody>
                <tr style="height: 0">
                  <td>
                    <svg
                      style="height: 100"
                      id="eoyaUvbgErV1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 300 300"
                      shape-rendering="geometricPrecision"
                      text-rendering="geometricPrecision"
                    >
                      <ellipse
                        rx="169.778634"
                        ry="158.950915"
                        transform="matrix(.847789 0 0 0.897367 156.063523 150)"
                        fill="#1c1c1c"
                        stroke-width="0"
                      />
                      <text
                        dx="0"
                        dy="0"
                        font-family='"eoyaUvbgErV1:::Lora"'
                        font-size="90"
                        text-decoration="line-through"
                        font-weight="700"
                        transform="matrix(1.619957 0 0 2.034495 58.526736 216.88345)"
                        fill="#3ecf8e"
                        stroke-width="0"
                      >
                        <tspan y="0" font-weight="700" stroke-width="0">
                          <![CDATA[ TC ]]>
                        </tspan>
                      </text>
                      <style>
                        <![CDATA[
                                            @font-face {font-family: 'eoyaUvbgErV1:::Lora';font-style: normal;font-weight: 700;src: url(data:font/ttf;charset=utf-8;base64,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) format('truetype');}
                                            ]]>
                      </style>
                    </svg>
                  </td>
                  <td style="text-align: right">
                    <span style="font-size: 30px; line-height: 35px; weight: 800; color: #3ECF8E"
                      >Terminal Connect</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </header>
    
          <main>
            <div
              style="
                margin: 0;
                margin-top: 70px;
                padding: 92px 30px 115px;
                background: #c2ebce;
                border-radius: 30px;
                text-align: center;
              "
            >
              <div style="width: 100%; max-width: 489px; margin: 0 auto">
                <h1
                  style="
                    margin: 0;
                    font-size: 24px;
                    font-weight: 500;
                    color: #1f1f1f;
                  "
                >
                  Your OTP
                </h1>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-size: 16px;
                    font-weight: 500;
                  "
                >
                  Hey @${username},
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-weight: 500;
                    letter-spacing: 0.56px;
                  "
                >
                  Your Payment request has been Rejected.
                 ${message}
                </p>
                <button style={{ backgroundColor: 'emerald', padding: '10px' }}> <a href="https://tconnect.shivamk.com/dashboard" > Visit DashBoard </a></button>
                <p>
                  Incase of any queries and payment processing delay, please reach out to us at <a href="mailto:tc@shivamk.tech" style="color: #3ECF8E; text-decoration: none">
                </p>
              </div>
            </div>
    
            <p
              style="
                max-width: 400px;
                margin: 0 auto;
                margin-top: 90px;
                text-align: center;
                font-weight: 500;
                color: #8c8c8c;
              "
            >
              Need help? Ask at
              <a
                href="mailto:tc@shivamk.tech"
                style="color: #3ECF8E; text-decoration: none"
                >tc@shivamk.tech</a
              >
            </p>
       </button>   </main>
    
          <footer
            style="
              width: 100%;
              max-width: 490px;
              margin: 20px auto 0;
              text-align: center;
              border-top: 1px solid #e6ebf1;
            "
          >
            <p
              style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #3ECF8E;
              "
            >
              Terminal Connect
            </p>
    
            <p style="margin: 0; margin-top: 16px; color: #434343">
              Copyright © 2024 Terminal COnnect. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
    
    `;
}

module.exports = { otpTemplate, PaymentSubmitTemplate, PaymentApprovedTemplate, PaymentRejectedTemplate };
