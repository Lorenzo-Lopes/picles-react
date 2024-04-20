interface IFilterColumns {
    name: 'gender' | 'size' | 'type'
    title: string
    options: { value: string; text: string }[]
  }
  
  export const filterColumns: IFilterColumns[] = [
  {
    name: "type",
    title: "Especie",
    options: [
      {
        value: "",
        text: "Todos",
      },
      {
        value: "Dog",
        text: "Cachorro",
      },
      {
        value: "Cat",
        text: "Gato",
      },
    ],
  },
  {
    name: "size",
    title: "Tamanho",
    options: [
      {
        value: "",
        text: "Todos",
      },
      {
        value: "Small",
        text: "Pequeno",
      },
      {
        value: "Medium",
        text: "Medio",
      },
      {
        value: "Large",
        text: "Grande",
      },
    ],
  },
  {
    name: "gender",
    title: "Genero",
    options: [
      {
        value: "",
        text: "Todos",
      },
      {
        value: "Male",
        text: "Macho",
      },
      {
        value: "Female",
        text: "Femea",
      },
    ],
  },
];
