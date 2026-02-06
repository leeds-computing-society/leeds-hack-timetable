export interface Properties extends React.SVGProps<SVGSVGElement> { };

export const RebuildingSocietyLogo = (properties: Properties) =>
{
    return (
        <svg aria-label="The Rebuilding Society Logo" viewBox="0 0 85 24" {...properties}>
            <path d="M23.932 0L11.966 12L0 0H23.932Z" fillOpacity="0.75" />
            <path d="M11.966 12L0 24V0L11.966 12Z" />
            <path d="M54.466 24H30.534L42.5 12L54.466 24Z" />
            <path d="M42.5 12L30.534 24V0L42.5 12Z" fillOpacity="0.75" />
            <path d="M85 0L61.068 12V0H85Z" />
            <path d="M85 12V24H61.068L85 12Z" fillOpacity="0.75" />
        </svg>
    );
};
