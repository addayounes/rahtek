import Twilio from "twilio";
import config from "../config/config";
import { VerificationInstance } from "twilio/lib/rest/verify/v2/service/verification";
import { VerificationCheckInstance } from "twilio/lib/rest/verify/v2/service/verificationCheck";

const accountSid = config.sms.acc;
const authToken = config.sms.token;
const client = Twilio(accountSid, authToken);

export const sendOTP = async (phone: string): Promise<VerificationInstance> => {
  const sms = client.verify.v2
    .services(config.sms.service)
    .verifications.create({ to: phone, channel: "sms" });
  return sms;
};

export const verifyOTP = async (
  phone: string,
  code: string
): Promise<VerificationCheckInstance> => {
  const sms = await client.verify.v2
    .services(config.sms.service)
    .verificationChecks.create({ to: phone, code });
  return sms;
};
