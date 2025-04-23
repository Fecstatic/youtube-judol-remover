import { Card, CardContent } from '../ui/card';

export default function LimitExceed() {
  return (
    <Card>
      <CardContent>
        <h3 className="text-2xl font-semibold text-red-500">Limit Exceeded</h3>
        <p className="text-sm text-muted-foreground">
          Your API limit has been exceeded.
        </p>
      </CardContent>
    </Card>
  );
}
