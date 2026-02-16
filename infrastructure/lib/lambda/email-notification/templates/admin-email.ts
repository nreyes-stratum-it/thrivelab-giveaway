// infrastructure/lib/lambda/email-notification/templates/admin-email.ts

import {COLORS, GiveawayEntryCreatedEvent} from '../constants';

export function generateAdminEmailHtml(entry: GiveawayEntryCreatedEvent): string {
    const reasonsList = entry.reasons?.map(r => `<li style="margin-bottom: 8px; color: ${COLORS.olive700};">${r}</li>`).join('') || '';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>New Giveaway Entry</title>
    <!--[if mso]>
    <style type="text/css">
        body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
    </style>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif; background-color: ${COLORS.background};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 0;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="700" cellspacing="0" cellpadding="0" style="max-width: 700px; background-color: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); overflow: hidden; border: 0;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: ${COLORS.olive800}; padding: 32px 40px;">
                            <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 600;">
                                🎯 New Giveaway Entry
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Contenido -->
                    <tr>
                        <td style="padding: 40px;">
                            
                            <!-- Información personal -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 32px; border: 0;">
                                <tr>
                                    <td colspan="2">
                                        <h2 style="margin: 0 0 20px 0; color: ${COLORS.olive800}; font-size: 18px; font-weight: 600; border-bottom-width: 2px; border-bottom-style: solid; border-bottom-color: ${COLORS.olive200}; padding-bottom: 12px;">
                                            Participant Information
                                        </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; color: ${COLORS.olive600}; font-size: 14px; font-weight: 500; width: 180px;">
                                        Name:
                                    </td>
                                    <td style="padding: 12px 0; color: ${COLORS.olive900}; font-size: 15px; font-weight: 600;">
                                        ${entry.firstName} ${entry.lastName}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; color: ${COLORS.olive600}; font-size: 14px; font-weight: 500;">
                                        Email:
                                    </td>
                                    <td style="padding: 12px 0; color: ${COLORS.olive900}; font-size: 15px;">
                                        <a href="mailto:${entry.email}" style="color: ${COLORS.olive700}; text-decoration: none;">
                                            ${entry.email}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; color: ${COLORS.olive600}; font-size: 14px; font-weight: 500;">
                                        Phone:
                                    </td>
                                    <td style="padding: 12px 0; color: ${COLORS.olive900}; font-size: 15px;">
                                        ${entry.phoneNumber}
                                    </td>
                                </tr>
                                ${entry.instagramHandle ? `
                                <tr>
                                    <td style="padding: 12px 0; color: ${COLORS.olive600}; font-size: 14px; font-weight: 500;">
                                        Instagram:
                                    </td>
                                    <td style="padding: 12px 0; color: ${COLORS.olive900}; font-size: 15px;">
                                        @${entry.instagramHandle}
                                    </td>
                                </tr>
                                ` : ''}
                            </table>
                            
                            <!-- Detalles del giveaway -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 32px; border: 0;">
                                <tr>
                                    <td colspan="2">
                                        <h2 style="margin: 0 0 20px 0; color: ${COLORS.olive800}; font-size: 18px; font-weight: 600; border-bottom-width: 2px; border-bottom-style: solid; border-bottom-color: ${COLORS.olive200}; padding-bottom: 12px;">
                                            Entry Details
                                        </h2>
                                    </td>
                                </tr>
                                ${entry.painArea ? `
                                <tr>
                                    <td style="padding: 12px 0; color: ${COLORS.olive600}; font-size: 14px; font-weight: 500; width: 180px;">
                                        Pain Area:
                                    </td>
                                    <td style="padding: 12px 0; color: ${COLORS.olive900}; font-size: 15px;">
                                        ${entry.painArea === 'Other' && entry.painAreaOther ? entry.painAreaOther : entry.painArea}
                                    </td>
                                </tr>
                                ` : ''}
                                ${entry.interestLevel ? `
                                <tr>
                                    <td style="padding: 12px 0; color: ${COLORS.olive600}; font-size: 14px; font-weight: 500;">
                                        Interest Level:
                                    </td>
                                    <td style="padding: 12px 0; color: ${COLORS.olive900}; font-size: 15px;">
                                        ${entry.interestLevel}/10
                                    </td>
                                </tr>
                                ` : ''}
                                ${entry.reasons && entry.reasons.length > 0 ? `
                                <tr>
                                    <td colspan="2" style="padding: 20px 0 0 0;">
                                        <p style="margin: 0 0 12px 0; color: ${COLORS.olive600}; font-size: 14px; font-weight: 500;">
                                            Reasons for Entering:
                                        </p>
                                        <ul style="margin: 0; padding-left: 20px; color: ${COLORS.olive700}; font-size: 15px; line-height: 1.6;">
                                            ${reasonsList}
                                        </ul>
                                    </td>
                                </tr>
                                ` : ''}
                            </table>
                            
                            <!-- Footer info -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 0;">
                                <tr>
                                    <td style="background-color: ${COLORS.olive50}; padding: 20px; border-radius: 8px; border-left: 4px solid ${COLORS.olive500};">
                                        <p style="margin: 0; color: ${COLORS.olive700}; font-size: 13px; line-height: 1.5;">
                                            <strong>Entry ID:</strong> ${entry.entryId}<br>
                                            <strong>Timestamp:</strong> ${new Date().toLocaleString('en-US', {timeZone: 'America/New_York'})} EST
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: ${COLORS.olive50}; padding: 24px 40px; text-align: center; border-top-width: 1px; border-top-style: solid; border-top-color: ${COLORS.olive200};">
                            <p style="margin: 0; color: ${COLORS.olive600}; font-size: 12px;">
                                ThriveLab Admin Notification System
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