import { NextApiRequest, NextApiResponse } from 'next';
import { apiService } from '../../app/services/apiService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const formData = req.body;

      const response = await apiService.post('/Data/SubmitSurvey', formData);

      if (response) {
        res.status(200).json({ message: 'Survey data submitted successfully.' });
      } else {
        res.status(500).json({ message: 'Failed to submit survey data.' });
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      res.status(500).json({ message: 'An error occurred while submitting survey.', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
