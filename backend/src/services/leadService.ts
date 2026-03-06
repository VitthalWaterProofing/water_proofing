import Lead from '../models/Lead';
import sendEmail from '../utils/sendEmail';

export const submitLeadQuery = async (customerName: string, email: string, phone: string, serviceRequested: string, message: string) => {
  const lead = await Lead.create({
    customerName,
    email,
    phone,
    serviceRequested,
    message,
  });

  // Send email notification to Admin (non-blocking)
  try {
    await sendEmail({
      email: process.env.ADMIN_EMAIL || 'admin@waterproofing.com',
      subject: `New Lead: ${serviceRequested} from ${customerName}`,
      message: `You have received a new inquiry from ${customerName}.\n\nPhone: ${phone}\nEmail: ${email}\nService: ${serviceRequested}\n\nMessage:\n${message}`,
      html: `<p>You have received a new inquiry from <strong>${customerName}</strong>.</p>
             <ul>
              <li><strong>Phone:</strong> ${phone}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Service:</strong> ${serviceRequested}</li>
             </ul>
             <p><strong>Message:</strong><br/>${message}</p>`
    });
  } catch (err) {
    console.error('Error sending lead notification email', err);
  }

  return lead;
};

export const getAllLeads = async () => {
  return await Lead.find({}).sort({ createdAt: -1 });
};

export const updateLeadStatusQuery = async (id: string, status: string) => {
  const validStatuses = ['New', 'Contacted', 'Quoted', 'Closed'];
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status');
  }

  const lead = await Lead.findById(id);
  if (!lead) {
     throw new Error('Lead not found');
  }

  lead.status = status as 'New' | 'Contacted' | 'Quoted' | 'Closed';
  return await lead.save();
};
