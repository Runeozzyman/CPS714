import { NextApiRequest, NextApiResponse } from 'next';
import { apiService } from '../../app/services/apiService';

const POINTS_TO_ADD = 200;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const formData = req.body;
      const response = await apiService.post('/Data/SubmitFeedbackFormData', formData);
      
      if (response) {
        const username = formData.userID;

        const addPointsResponse = await fetch('http://127.0.0.1:8080/api/database/addPoints', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, points: POINTS_TO_ADD }),
        });

        if (addPointsResponse) {
          res.status(200).json({ message: 'Feedback submitted successfully and points added.' });
        } else {
          res.status(500).json({ message: 'Feedback submitted, but failed to add points.' });
        }
      } else {
        res.status(500).json({ message: 'Failed to submit feedback.' });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      res.status(500).json({ message: 'An error occurred while submitting feedback.', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
