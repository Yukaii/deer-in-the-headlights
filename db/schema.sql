-- Create Locations table
CREATE TABLE IF NOT EXISTS public.locations (
  id SERIAL PRIMARY KEY,
  location GEOGRAPHY(POINT) NOT NULL
);

-- Create Incidents table
CREATE TABLE IF NOT EXISTS public.incidents (
  id SERIAL PRIMARY KEY,
  location_id INTEGER NOT NULL,
  incident_type VARCHAR(50) NOT NULL,
  landmark TEXT,
  description_text TEXT,
  description_link VARCHAR(500),
  FOREIGN KEY (location_id) REFERENCES public.locations(id)
);

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
