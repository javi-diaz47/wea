import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { CreateOfferForm } from "@/components/CreateOfferForm";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { ProfileUserWithStar } from "@/components/ProfileUserWithStar";
import { conditionalTextColor } from "@/utils/conditionalTextColor";
import { useCreateOffer } from "@/hooks/useCreateOffer";
import { TagList } from "@/components/TagList";
import { supabase } from "@/utils/supabaseClient";
import { PreviewBar } from "@/components/PreviewBar";
import { OfferMd } from "@/components/OfferMd";

export default function createOfferPrivate({ profile_id, worker }) {
  const {
    inputValues,
    onHandleChange,
    onHandleTags,
    onSave,
    preview,
    onPreview,
    onEdit,
  } = useCreateOffer();

  return (
    <div className="flex flex-col gap-6 p-8">
      <PreviewBar state={preview} onState={onPreview} onNotState={onEdit} />

      <ProfileUserWithStar
        href={worker.id}
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
            onSubmit={onSave}
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
