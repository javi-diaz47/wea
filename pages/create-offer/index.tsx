import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { CreateOfferForm } from "@/components/CreateOfferForm";
import { useCreateOffer } from "@/hooks/useCreateOffer";
import { PreviewBar } from "@/components/PreviewBar";
import { OfferMd } from "@/components/OfferMd";

export default function createOffer({ profile_id }) {
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

      {!!preview && (
        <OfferMd
          name={inputValues.name}
          price={inputValues.price}
          tags={inputValues.tags}
          description={inputValues.description}
        />
      )}
      {!preview && (
        <div className=" max-w-6xl ">
          <CreateOfferForm
            name={inputValues.name}
            description={inputValues.description}
            resume={inputValues.resume}
            price={inputValues.price}
            tags={inputValues.tags}
            onHandleChange={onHandleChange}
            onHandleTags={onHandleTags}
            onSubmit={(ev) =>
              onSave({ ev, owner_id: profile_id, offer: inputValues })
            }
          />
        </div>
      )}
    </div>
  );
}

export async function getStaticProps({ req, res }) {
  // const token = getCookie('token', { req, res });

  // return { props: { profile_id: jwt.decode(token).sub } };

  return { props: { profile_id: "843edb12-63fa-4351-a549-d39d21b45199" } };
}
