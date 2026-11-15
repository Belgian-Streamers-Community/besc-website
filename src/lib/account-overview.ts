import {z} from 'zod';
const state=z.enum(['ready','disabled','unavailable']);
export const accountOverviewSchema=z.object({existingPortal:z.boolean(),profile:state,profileStatus:z.string().max(120).nullable(),attention:z.number().int().nonnegative(),applicationsState:state,applications:z.array(z.object({id:z.string().uuid(),title:z.string().max(240),status:z.string().max(120)}).strict()).max(5),applicationsCount:z.number().int().nonnegative(),organizationsState:state,organizations:z.array(z.object({id:z.string().uuid(),name:z.string().max(180)}).strict()).max(50)}).strict();
export type AccountOverviewData=z.infer<typeof accountOverviewSchema>;
