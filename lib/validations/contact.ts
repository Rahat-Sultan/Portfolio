export type ContactFormData = {
  name: string;
  email: string;
  company: string;
  message: string;
  website?: string;
};

export function validateContactForm(data: ContactFormData) {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  if (!name || name.length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message || message.length < 10) {
    errors.message = "Please enter a message (at least 10 characters).";
  }

  if (message.length > 2000) {
    errors.message = "Message must be under 2000 characters.";
  }

  return errors;
}
