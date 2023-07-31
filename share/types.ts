import { z } from "zod";

export const CreateIncidentPayload = z.object({
  title: z.string(),
  description: z.string().nullish(),
  link: z.string().nullish(),
  landmark: z.string().nullish(),
  photos: z.array(z.string()).nullish(),
  location_id: z.number(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),

  // 'infra' | 'traffic' | 'crime' | 'other'
  incident_type: z.enum(["infra", "traffic", "crime", "other"]),
}).partial({
  location_id: true,
  latitude: true,
  longitude: true,
}).refine((data) => 
  // either location_id or latitude and longitude must be present
  (data.location_id !== undefined) || (data.latitude !== undefined && data.longitude !== undefined),
  'either location_id or latitude and longitude must be present'
);

export type CreateIncidentPayloadType = z.infer<typeof CreateIncidentPayload>;
