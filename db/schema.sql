CREATE EXTENSION moddatetime;
CREATE EXTENSION postgis;

-- Create Locations table
CREATE TABLE IF NOT EXISTS public.locations (
  id SERIAL PRIMARY KEY,
  location GEOGRAPHY(POINT) NOT NULL
);

CREATE OR REPLACE FUNCTION public.get_location_info_by_id(location_id INTEGER)
RETURNS TABLE(id INTEGER, location_text TEXT, x FLOAT, y FLOAT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    l.id AS id,
    ST_AsText(l.location) AS location_text,
    ST_X(l.location::geometry) AS x,
    ST_Y(l.location::geometry) AS y
  FROM
    public.locations l
  WHERE
    l.id = location_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.upsert_location_info(lat FLOAT, lng FLOAT)
RETURNS TABLE(id INTEGER, location_text TEXT, x FLOAT, y FLOAT) AS $$
DECLARE
  loc GEOGRAPHY(POINT);
BEGIN
  loc := ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography;

  -- Check if location exists
  IF NOT EXISTS (SELECT
    l.id AS id,
    ST_AsText(l.location) AS location_text,
    ST_X(l.location::geometry) AS x,
    ST_Y(l.location::geometry) AS y
  FROM public.locations l WHERE l.location = loc) THEN
    -- If location doesn't exist, insert it
    INSERT INTO public.locations(location) VALUES (loc);
  END IF;

  RETURN QUERY
  SELECT
    l.id AS id,
    ST_AsText(l.location) AS location_text,
    ST_X(l.location::geometry) AS x,
    ST_Y(l.location::geometry) AS y
  FROM
    public.locations l
  WHERE
    l.location = loc;
END;
$$ LANGUAGE plpgsql;

-- Create Incidents table
CREATE TABLE IF NOT EXISTS public.incidents (
  id SERIAL PRIMARY KEY,
  location_id INTEGER NOT NULL,
  incident_type VARCHAR(50) NOT NULL,
  landmark TEXT,
  description_text TEXT,
  description_link VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (location_id) REFERENCES public.locations(id)
);

CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON public.incidents
  FOR EACH ROW
  EXECUTE PROCEDURE moddatetime(updated_at);

CREATE INDEX incidents_type_index
  ON public.incidents (incident_type);

-- Create Photos table
CREATE TABLE IF NOT EXISTS public.photos (
  id SERIAL PRIMARY KEY,
  incident_id INTEGER NOT NULL,
  photo_link TEXT,
  FOREIGN KEY (incident_id) REFERENCES public.incidents(id)
);

-- Create index for the GEOGRAPHY type column
CREATE INDEX locations_geo_index
  ON public.locations
  USING GIST (location);
