import { Request, Response } from "express";
import KeywordRepository from "../models/Keywords/Keyword.repository";

export const get = async (req: Request, res: Response): Promise<void> => {
  const keywords = await KeywordRepository.getKeywords();
  res.json(keywords);
};

export const getById = async (req: Request, res: Response): Promise<void> => {};

export const post = async (req: Request, res: Response): Promise<void> => {};

export const put = async (req: Request, res: Response): Promise<void> => {};

export const del = async (req: Request, res: Response): Promise<void> => {};
