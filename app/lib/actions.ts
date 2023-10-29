'use server'

import { CreateInvoice, DeleteInvoice, UpdateInvoice } from './schemas'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createInvoice(formData: FormData) {
  try {
    const rawFormData = Object.fromEntries(formData.entries())
    const { customerId, amount, status } = CreateInvoice.parse(rawFormData)

    //Good DB practice por money
    const amountInCents = amount * 100
    console.log('amountInCents', amountInCents)
    const date = new Date().toISOString().split('T')[0]

    await sql`INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`
  } catch (error) {
    console.log(error)
    return { message: 'Failed to create invoice' }
  }

  revalidatePath('/dasboard/invoices')
  redirect('/dashboard/invoices')
}

export async function updateInvoice(formData: FormData) {
  try {
    const rawFormData = Object.fromEntries(formData.entries())
    const { id, customerId, amount, status } = UpdateInvoice.parse(rawFormData)

    const amountInCents = amount * 100
    console.log('amountInCents', amountInCents)

    await sql`UPDATE invoices
  SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
  WHERE id = ${id}`
  } catch (error) {
    console.log(error)
    return { message: 'Failed to update invoice' }
  }

  revalidatePath('/dasboard/invoices')
  redirect('/dashboard/invoices')
}

export async function deleteInvoice(formData: FormData) {
  try {
    const rawFormData = Object.fromEntries(formData.entries())
    const { id } = DeleteInvoice.parse(rawFormData)
    await sql`DELETE FROM invoices WHERE id = ${id}`
    revalidatePath('/dasboard/invoices')
  } catch (error) {
    console.log(error)
    return { message: 'Failed to delete invoice' }
  }
}
