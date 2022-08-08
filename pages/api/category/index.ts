import { NextApiResponse, NextApiRequest } from 'next'
import {categories} from '../../../public/data/category'
import { Category } from '../../../types/category'

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Category[]>
) 
{
  return res.status(200).json(categories)
}