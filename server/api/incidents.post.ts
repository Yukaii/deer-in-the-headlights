import { supabase } from "~/server/lib/supabaseClient";
import { CreateIncidentPayload } from "~/share/types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body) {
    return { status: 400 };
  }

  const result = CreateIncidentPayload.safeParse(body);
  if (!result.success) {
    return { status: 400, body: result.error };
  }

  const {
    description,
    title,
    incident_type,
    link,
    photos,
    latitude,
    longitude,
    landmark,
    location_id,
  } = result.data;

  // upsert location
  let location;
  if (location_id) {
    const { error: locationError, data: locationData } = await supabase.rpc('get_location_info_by_id', {
      location_id,
    }).select();

    if (locationError) {
      return { status: 500, body: locationError.message };
    }

    location = locationData[0];

    if (!location) {
      return { status: 400, body: "location_id not found" };
    }
  } else {
    if (!latitude || !longitude) {
      return { status: 400, body: "latitude and longitude must be present" };
    }

    let { error: locationError, data: locationData } = await supabase
      .rpc("upsert_location_info", {
        lat: latitude,
        lng: longitude,
      })
      .select();

    if (locationError) {
      return { status: 500, body: locationError.message };
    }

    location = locationData?.[0];
  }

  // create incident
  const { error, data } = await supabase
    .from("incidents")
    .insert({
      title,
      description,
      incident_type,
      link,
      landmark,
      location_id: location.id,
    })
    .select();

  if (error) {
    return { status: 500, body: error.message };
  }

  const incident = data?.[0];
  let photosData: any;

  if (photos) {
    const { error: photoError, data: insertedPhotos } = await supabase
      .from("photos")
      .insert(
        photos.map((photo) => ({
          incident_id: incident.id,
          photo_link: photo,
        })),
      )
      .select();

    if (photoError) {
      return { status: 500, body: photoError.message };
    }

    photosData = insertedPhotos;
  }

  const returnData = {
    ...incident,
    location: {
      id: location.id,
      longitude: location.x,
      latitude: location.y,
    },
    photos: photosData,
  };

  return {
    status: 200,
    body: returnData,
  };
});
