import { SearchParamsType } from "@/lib/definitions";
import EditSettingsForm from "@/components/settings/EditForm";
import RemoveAccountModal from "@/components/settings/RemoveAccountModal";

export default async function SettingsPage({ searchParams }: SearchParamsType) {
  const { removeAccount } = await searchParams;

  return (
    <div className="max-w-xl mx-auto">
      <EditSettingsForm />
      {
        removeAccount && <RemoveAccountModal />
      }
    </div>
  );
}