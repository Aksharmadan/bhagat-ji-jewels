import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().optional(),
  productSlug: z.string().optional(),
  type: z.enum(["inquiry", "appointment", "newsletter"]).default("inquiry"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
