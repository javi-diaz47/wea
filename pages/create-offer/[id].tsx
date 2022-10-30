import { CreateOfferForm } from "Presentation/components/CreateOfferForm";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { ProfileUserWithStar } from "Presentation/components/Profile/ProfileUserWithStar";
import { useCreateOffer } from "@/hooks/useCreateOffer";
import { supabase } from "Logic/utils/supabaseClient";
import { OfferMd } from "Presentation/components/OfferMd";
import { ConditionalBar } from "Presentation/components/ConditionalBar";

export default function createOfferPrivate({ profile_id, worker }) {
  const {
    inputValues,
    onHandleChange,
    onHandleTags,
    onSave,
    preview,
    onPreview,
    onEdit,
    onSuccess,
  } = useCreateOffer();

  return (
    <div className="flex flex-col gap-6 p-8">
      {onSuccess()}
      <ConditionalBar
        state={preview}
        stateTrueText="Vista previa"
        stateFalseText="Editar"
        onState={onPreview}
        onNotState={onEdit}
        className="flex flex-row-reverse justify-end"
        classNameBtnSelected="text-love"
        classNameBtn="text-black"
      />
      <ProfileUserWithStar
        href={`profile/${worker.id}`}
        name={worker.name}
        last_name={worker.last_name}
        star={worker.calification}
      />
      {!!preview && (
        <OfferMd
          name={inputValues.name}
          price={inputValues.price}
          tags={inputValues.tags}
          description={inputValues.description}
        />
      )}
      {!preview && (
        <div className=" max-w-6xl">
          <CreateOfferForm
            name={inputValues.name}
            description={inputValues.description}
            resume={inputValues.resume}
            price={inputValues.price}
            tags={inputValues.tags}
            onHandleChange={onHandleChange}
            onHandleTags={onHandleTags}
            onSubmit={(ev) =>
              onSave({
                ev,
                offer: inputValues,
                owner_id: profile_id,
                worker_id: worker.id,
              })
            }
          />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const token = getCookie("token", { req, res });
  const { data: worker, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.id)
    .limit(1)
    .single();
  return {
    props: {
      profile_id: jwt.decode(token).sub,
      worker: worker,
    },
  };
}

export async function getServerSidePaths() {
  const { data: workers, error } = await supabase.from("profiles").select("id");

  return {
    paths: workers.map((worker) => ({
      params: {
        id: `${worker.id}`,
      },
    })),
    fallback: false,
  };
}
