import { NextApiRequest, NextApiResponse } from 'next';
import { apiService } from '../../app/services/apiService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await apiService.get('/Data/GetFeedbackTopics');
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch topics', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
