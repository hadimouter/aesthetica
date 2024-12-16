import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb/connection';
import User from '@/lib/models/User';
import Patient from '@/lib/models/Patient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { 
      email, 
      password, 
      firstName, 
      lastName,
      dateOfBirth,
      gender,
      phone
    } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Créer l'utilisateur
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      role: 'patient'
    });

    // Créer le profil patient associé
    await Patient.create({
      userId: user._id,
      dateOfBirth,
      gender,
      phone,
      medicalHistory: {
        allergies: [],
        medications: [],
        previousSurgeries: [],
        conditions: []
      }
    });

    res.status(201).json({ message: 'Compte créé avec succès' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Erreur lors de la création du compte' });
  }
}