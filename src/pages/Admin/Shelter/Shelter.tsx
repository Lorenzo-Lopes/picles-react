import { useForm } from "react-hook-form";
import { Button, ButtonVariant } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { Panel } from "../../../components/layout/Panel";
import styles from "./Shelter.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormMask } from "use-mask-input";
import { toast } from "sonner";
import { updateShelter } from "../../../services/shelter/updateShelter";
import { useQueryClient } from "@tanstack/react-query";
import { useShelter } from "../../../hooks/useShelter";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";


const shelterSchema = z.object({
  name: z
  .string()
  .min(2, "nome deve ter no minimo 2 caracteres")
  .max(30, "Nomde deve ter no maximo 30."),
  email: z.string().email("Campo deve ser um email"),
  phone: z.string().refine(
    (value) => {
      const digits = value.replace(/\D/g, "").length;
      return digits >= 10 && digits <= 11;
    },
    { message: "Numero deve ter entre 10 e 11 numeros" }
  ),
  whatsApp: z.string().refine(
    (value) => {
      const digits = value.replace(/\D/g, "").length;
      return digits >= 10 && digits <= 11;
    },
    { message: "Numero deve ter entre 10 e 11 numeros" }
  ),
});

type ShelterSchema = z.infer<typeof shelterSchema>;

export function Shelter() {
  const { handleSubmit, register, formState, reset } = useForm<ShelterSchema>({resolver: zodResolver(shelterSchema), });

  const queryClient = useQueryClient();
  const { data, isLoading } = useShelter()

  useEffect(() => {
    if (!isLoading && data) {
      reset({
        name: data.shelterName,
        email: data.shelterEmail,
        phone: data.shelterPhone,
        whatsApp: data.shelterWhatsApp,
      })
    }
  }, [data, isLoading, reset])
  


  const registerwithMask = useHookFormMask(register);
  

  async function submit({ name, email, phone, whatsApp }: ShelterSchema) {
    console.log(name, email, phone, whatsApp);

    const toastid = toast.loading("Salvando Dados");
    try {
      await updateShelter({
        name,
        email,
        phone: phone.replace(/\D/g, ""),
        whatsApp: whatsApp.replace(/\D/g, ""),
      });
      queryClient.invalidateQueries({ queryKey: ["get-shelter"] });
      toast.success("salvou caraio",
        {
          id: toastid,
          closeButton: true,
        });
    } catch (error) {
      toast.error("Nao foi possivel salvar os dados"),
        {
          id: toastid,
          closeButton: true,
        };
    }
  }

  return (
    <Panel>
      {isLoading && <Skeleton count={4} width={320} height={32} />}
      {!isLoading && (
        <form className={styles.container} onSubmit={handleSubmit(submit)}>
          <div>
            <Input
              label="Nome"
      
              {...register("name")}
            />
            {formState.errors?.name && (
              <p className={styles.formError}>
                {" "}
                {formState.errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Input label="Email" {...register("email")} />
            {formState.errors?.email && (
              <p className={styles.formError}>
                {" "}
                {formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Phone"
              {...registerwithMask("phone", ["99 99999-9999", "99 9999-9999"])}
            />
            {formState.errors?.phone && (
              <p className={styles.formError}>
                {" "}
                {formState.errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <Input
              label="WhatsApp"
              {...registerwithMask("whatsApp", [
                "99 99999-9999",
                "99 9999-9999",
              ])}
            />
            {formState.errors?.whatsApp && (
              <p className={styles.formError}>
                {" "}
                {formState.errors.whatsApp.message}
              </p>
            )}
          </div>
          <Button type="submit"  variant={
              !formState.isDirty || formState.isSubmitting
                ? ButtonVariant.Disabled
                : ButtonVariant.Default
            }
          >Salvar Dados</Button>
        </form>
      )}
    </Panel>
  );
}
