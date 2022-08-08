import { NextApiResponse, NextApiRequest } from 'next'
import {people} from '../../../public/data/people'
import { Person } from '../../../types/person'

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Person[]>
) 
{
  return res.status(200).json(people)
}