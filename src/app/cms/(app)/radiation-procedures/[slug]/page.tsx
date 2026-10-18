import { notFound } from "next/navigation";
import { CmsRadiationProcedureEditor } from "@/components/cms/cms-radiation-procedure-editor";
import { radiationProcedureEditorModel } from "@/lib/cms/radiation-procedure-admin";

export const dynamic = "force-dynamic";

export default async function CmsRadiationProcedureEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = radiationProcedureEditorModel(slug);
  if (!model) notFound();
  const source = model.patch?.status ? model.patch : null;
  const initial = {
    h1: source?.h1 || model.baseline.h1,
    description: source?.description || model.baseline.description,
    quickAnswer: source?.quickAnswer || model.baseline.quickAnswer,
    note: source?.note?.length ? source.note : model.baseline.note,
    faqs: source?.faqs?.length ? source.faqs : model.baseline.faqs,
    markers: model.baseline.markers,
  };
  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">{model.kind}</p>
          <h1>{model.procedure}</h1>
          <p>
            The reviewed baseline is already on the public Arabic URL. A draft hides it. Regenerating
            a section only fills this form until you save. Clinical sections outside this form stay in code.
          </p>
        </div>
      </header>
      <CmsRadiationProcedureEditor
        slug={model.slug}
        procedure={model.procedure}
        kind={model.kind}
        publicPath={model.publicPath}
        baseline={model.baseline}
        initialStatus={model.patch?.status ?? "none"}
        initial={initial}
      />
    </div>
  );
}
