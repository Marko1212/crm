export type EmailStatus = 'INBOX' | 'SENT' | 'TRASH';

export type Email = {
  id: number;
  status: EmailStatus;
  from: string;
  read: boolean;
  contactName: string;
  avatar: string;
  email: string;
  body: string;
  subject: string;
  date: string;
};
