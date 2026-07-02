// src/utils/eventMapper.ts
export const toEventApi = (data: any) => ({
  title: data.title,
  date: data.date,
  start_time: data.startTime,
  end_time: data.endTime,
  location: data.location,
  image: data.image || null,
  external_url: data.externalUrl,
});
