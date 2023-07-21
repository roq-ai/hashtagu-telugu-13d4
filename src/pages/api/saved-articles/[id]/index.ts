import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { savedArticleValidationSchema } from 'validationSchema/saved-articles';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.saved_article
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSavedArticleById();
    case 'PUT':
      return updateSavedArticleById();
    case 'DELETE':
      return deleteSavedArticleById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSavedArticleById() {
    const data = await prisma.saved_article.findFirst(convertQueryToPrismaUtil(req.query, 'saved_article'));
    return res.status(200).json(data);
  }

  async function updateSavedArticleById() {
    await savedArticleValidationSchema.validate(req.body);
    const data = await prisma.saved_article.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSavedArticleById() {
    const data = await prisma.saved_article.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
