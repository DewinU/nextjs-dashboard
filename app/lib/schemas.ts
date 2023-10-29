import z from 'zod'

export const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
})

export const CreateInvoice = InvoiceSchema.omit({ id: true, date: true })

export const UpdateInvoice = InvoiceSchema.omit({ date: true })

export const DeleteInvoice = InvoiceSchema.pick({ id: true })
