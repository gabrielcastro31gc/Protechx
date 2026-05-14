import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display text-foreground">Configurações</h2>
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm font-subtitle"><strong>Email:</strong> {user?.email}</p>
          <p className="text-sm font-subtitle"><strong>ID:</strong> {user?.id}</p>
        </CardContent>
      </Card>
    </div>
  );
}
