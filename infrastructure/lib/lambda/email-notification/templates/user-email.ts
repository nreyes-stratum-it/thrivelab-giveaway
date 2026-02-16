// infrastructure/lib/lambda/email-notification/templates/user-email.ts

import {COLORS} from '../constants';

export function generateUserEmailHtml(firstName: string, frontendUrl: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Welcome to ThriveLab Giveaway</title>
    <!--[if mso]>
    <style type="text/css">
        body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
    </style>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: Georgia, 'Times New Roman', serif; background-color: ${COLORS.background};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 0;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: white; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden; border: 0;">
                    
                    <!-- Header con gradiente olive -->
                    <tr>
                        <td style="background: linear-gradient(135deg, ${COLORS.olive600} 0%, ${COLORS.olive700} 100%); padding: 48px 40px; text-align: center;">
                            <h1 style="margin: 0; color: white; font-size: 32px; font-weight: normal; letter-spacing: -0.5px;">
                                🎉 You're Entered!
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Contenido principal -->
                    <tr>
                        <td style="padding: 48px 40px;">
                            <p style="margin: 0 0 24px 0; color: ${COLORS.olive900}; font-size: 18px; line-height: 1.6;">
                                Hi <strong>${firstName}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: ${COLORS.olive800}; font-size: 16px; line-height: 1.7;">
                                Thank you for entering the <strong>ThriveLab Giveaway</strong>! We're excited to have you participate.
                            </p>
                            
                            <!-- Card de confirmación -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 0;">
                                <tr>
                                    <td style="background-color: ${COLORS.olive50}; border-left: 4px solid ${COLORS.olive500}; padding: 24px; margin: 32px 0; border-radius: 8px;">
                                        <p style="margin: 0; color: ${COLORS.olive800}; font-size: 15px; line-height: 1.6;">
                                            <strong style="color: ${COLORS.olive700};">✓ Your entry has been confirmed</strong><br>
                                            We'll contact you if you're selected as a winner!
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 0 0 24px 0; color: ${COLORS.olive800}; font-size: 16px; line-height: 1.7;">
                                In the meantime, feel free to explore more about what we offer and stay connected with us.
                            </p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 32px 0; border: 0;">
                                <tr>
                                    <td style="border-radius: 8px; background: linear-gradient(135deg, ${COLORS.olive500} 0%, ${COLORS.olive600} 100%);">
                                        <a href="${frontendUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 16px 32px; color: white; text-decoration: none; font-size: 16px; font-weight: 500; letter-spacing: 0.5px;">
                                            Visit ThriveLab →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 32px 0 0 0; color: ${COLORS.olive700}; font-size: 15px; line-height: 1.6;">
                                Best wishes,<br>
                                <strong style="color: ${COLORS.olive800};">The ThriveLab Team</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: ${COLORS.olive50}; padding: 32px 40px; text-align: center; border-top-width: 1px; border-top-style: solid; border-top-color: ${COLORS.olive200};">
                            <p style="margin: 0 0 8px 0; color: ${COLORS.olive600}; font-size: 13px;">
                                ThriveLab Giveaway
                            </p>
                            <p style="margin: 0; color: ${COLORS.olive500}; font-size: 12px;">
                                This is an automated confirmation email. Please do not reply.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}