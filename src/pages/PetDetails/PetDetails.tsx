import { Link, useParams } from "react-router-dom";
import { Header } from "../../components/common/Header/Header";
import { Grid } from "../../components/layout/Grid";
import styles from "./PetDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { getPetByID } from "../../services/pets/getPetById";
import { ImageBase64 } from "../../components/common/ImageBase64";
import { Skeleton } from "../../components/common/Skeleton";
import { useShelter } from "../../hooks/useShelter";
import { Button, ButtonVariant } from "../../components/common/Button";
import whatsapp from '../../assets/whatsapp.svg'

export function PetDetails() {
  const { id } = useParams();

  const {data: shelterData, isError: shelterIsError} = useShelter()
  const { data: dataPet, isLoading, isError: petIsError } = useQuery({
    queryKey: ["get-pet-by-id", id],
    queryFn: async () => {
      return await getPetByID(id ?? "");
    },
  });


  return (
    <Grid>
      <div className={styles.container}>
        <Header showReturn={true} />
        <main className={styles.content}>
          {isLoading && (
            <div className={styles.skeleton}>
              <Skeleton circle={true} width={200} height={200} />
              <Skeleton width={180} height={24} style={{ margin: 16 }} />
            </div>
          )}
          {!isLoading && (
            <>
              <ImageBase64
                src={dataPet?.photo}
                className={styles.picture}
                width=""
              />
              {petIsError && (
                <>
                  <h1>PET nao encontrado</h1>
                  <Link to="/pets/">Voltar para a listagem.</Link>
                </>
              )}
              {!petIsError && (
                <>
                  <h1>{dataPet?.name}</h1>
                  <span>Sobre o pet:</span>
                  <p> {dataPet?.bio}</p>

                  {!shelterIsError &&
                   <a href={`https://wa.me/${shelterData?.shelterWhatsApp}?text=olá gostaria de falar sobre ${dataPet?.name}` } target="_blank">
                    <Button variant={ButtonVariant.Text}>
                        <span className={styles.buttonWhatsapp}>

                        {<img src={whatsapp}/>}
                        Entre em contato com o abrigo
                        </span>
                    </Button>
                    </a>
                  }
                </>
              )}
            </>
          )}
        </main>
      </div>
    </Grid>
  );
}
