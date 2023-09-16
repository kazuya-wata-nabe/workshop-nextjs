export type SampleResponse = {
  id: string;
  name: string;
  birthday: string;
}

export type SampleModel = {
  id: string;
  name: string;
  birthday: {
    year: string;
    month: string;
    day: string;
  };
}

export type SampleForm = {
  name: string;
  birthday: Date;
}
