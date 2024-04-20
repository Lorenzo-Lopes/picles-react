import { useSearchParams } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { Header } from "../../components/common/Header/Header";
import { Pagination } from "../../components/common/Pagination";
import { Skeleton } from "../../components/common/Skeleton";
import { Grid } from "../../components/layout/Grid";
import { UsePetList } from "../../hooks/usePetList";
import styles from "./Pets.module.css";
import { Select } from "../../components/common/Select";
import { Button } from "../../components/common/Button";
import { filterColumns } from "./Pets.constants";
import { FormEvent } from "react";
import { GetPetsRequest } from "../../interfaces/pet";

// export function Pets() {
//   const [searchParams, setSerachParams] = useSearchParams();
//   const urlParams = {
//     page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
//     type: searchParams.get("type") ?? "",
//     size: searchParams.get("type") ?? "",
//     gender: searchParams.get("type") ?? "",
//   };
//   const { data, isLoading } = UsePetList(urlParams);

//   function changePage(page: number) {
//     setSerachParams((params) => {
//       params.set("page", String(page));
//       return params;
//     });
//   }

//   function applyFilters(event: FormEvent) {
//     event.preventDefault();
//     const formData = new FormData(event.target as HTMLFormElement);
//     const fields = Object.fromEntries(formData);

//     const newParams = new URLSearchParams();
//     fields.forEach((field) => {
//       if (urlParams[field]) {
//         newParams.set("page", '1');
//       }
//     });
//   }


export function Pets() {
  const [searchParams, setSearchParams] = useSearchParams()

  const urlParams = {
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    type: searchParams.get('type') ?? '',
    size: searchParams.get('size') ?? '',
    gender: searchParams.get('gender') ?? '',
  }

  const { data, isLoading } = UsePetList(urlParams)

  function changePage(page: number) {
    setSearchParams((params) => {
      params.set('page', String(page))
      return params
    })
  }

  function getFormValue(form: HTMLFormElement) {
    const formData = new FormData(form)
    return Object.fromEntries(formData)
  }

  function updateSearchParams(urlParams: GetPetsRequest) {
    const fields: (keyof GetPetsRequest)[] = ['type', 'size', 'gender']
    const newParams = new URLSearchParams()

    fields.forEach((field) => {
      if (urlParams[field]) {
        newParams.set(field, String(urlParams[field]))
      }
    })
    newParams.set('page', '1')

    return newParams
  }

  function applyFilters(event: FormEvent) {
    event.preventDefault()

    const formValues = getFormValue(event.target as HTMLFormElement)
    const newSearchParams = updateSearchParams(formValues)

    setSearchParams(newSearchParams)
  }

  return (
    <Grid>
      <div className={styles.container}>
        <Header />
        <form onSubmit={applyFilters} className={styles.filters}>
          <div className={styles.columns}>
            {filterColumns.map((filter) => (
              <div key={filter.name} className={styles.column}>
                <Select
                  label={filter.title}
                  defaultValue={urlParams[filter.name]}
                  name={filter.name}
                  options={filter.options}
                ></Select>
              </div>
            ))}
          </div>
          <Button type="submit"> Buscar</Button>
        </form>
        {isLoading && (
          <Skeleton count={5} containerClassName={styles.skeleton} />
        )}
        <main className={styles.list}>
          {data?.items.map((pet) => (
            <Card
              key={pet.id}
              href={`/pet/${pet.id}`}
              text={pet.name}
              thumb={pet.photo}
            />
          ))}
        </main>
        {data?.currentPage && (
          <Pagination
            currentPage={data.currentPage}
            totalPages={data.totalPages}
            onPageChange={(number) => changePage(number)}
          />
        )}
      </div>
    </Grid>
  );
}
