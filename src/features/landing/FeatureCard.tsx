const FeatureCard = (props: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-md border border-border bg-card p-5">
    <div className="size-12 rounded-md bg-gradient-to-bl from-yellow-500 via-purple-500 to-red-500 p-2 [&_svg]:stroke-primary-foreground [&_svg]:stroke-2">
      {props.icon}
    </div>

    <div className="mt-2 text-lg font-bold">{props.title}</div>

    <div className="mt-2 text-muted-foreground">{props.children}</div>
  </div>
);

export { FeatureCard };
