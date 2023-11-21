export type SampleResponse = {
  id: string;
  name: string;
  birthday: string;
}

export type SampleModel = {
  id: string;
  name: string;
  birthday: Date;
}

export type SampleForm = Omit<SampleModel, "id">
