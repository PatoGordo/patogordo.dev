import { MailData } from "./mail-data";

export type SendMail = (data: MailData) => Promise<void>;
