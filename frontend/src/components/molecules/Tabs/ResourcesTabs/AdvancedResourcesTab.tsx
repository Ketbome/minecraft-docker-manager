/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { ServerConfig } from "@/lib/types/types";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface AdvancedResourcesTabProps {
  config: ServerConfig;
  updateConfig: (field: keyof ServerConfig, value: any) => void;
}

export const AdvancedResourcesTab: FC<AdvancedResourcesTabProps> = ({ config, updateConfig }) => {
  // Función para manejar el cambio de Auto-Stop
  const handleAutoStopChange = (checked: boolean) => {
    updateConfig("enableAutoStop", checked);

    // Si se activa Auto-Stop, desactivar Auto-Pause
    if (checked && config.enableAutoPause) {
      updateConfig("enableAutoPause", false);
    }
  };

  // Función para manejar el cambio de Auto-Pause
  const handleAutoPauseChange = (checked: boolean) => {
    updateConfig("enableAutoPause", checked);

    // Si se activa Auto-Pause, desactivar Auto-Stop
    if (checked && config.enableAutoStop) {
      updateConfig("enableAutoStop", false);
    }
  };

  return (
    <>
      <div className="p-4 rounded-md bg-gray-800/50 border border-gray-700/50 space-y-2">
        <Label htmlFor="tz" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
          <Image src="/images/clock.webp" alt="Zona Horaria" width={16} height={16} />
          Zona Horaria
        </Label>
        <Select value={config.tz || "UTC"} onValueChange={(value) => updateConfig("tz", value)}>
          <SelectTrigger id="tz" className="bg-gray-800/70 border-gray-700/50 focus:ring-emerald-500/30">
            <SelectValue placeholder="Selecciona la zona horaria" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="UTC">UTC</SelectItem>
            <SelectItem value="America/Los_Angeles">America/Los_Angeles</SelectItem>
            <SelectItem value="America/New_York">America/New_York</SelectItem>
            <SelectItem value="Europe/London">Europe/London</SelectItem>
            <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
            <SelectItem value="Europe/Madrid">Europe/Madrid</SelectItem>
            <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
            <SelectItem value="Australia/Sydney">Australia/Sydney</SelectItem>
            <SelectItem value="America/Santiago">America/Santiago</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-400">Zona horaria del servidor (por defecto: UTC)</p>
      </div>

      {/* Auto-Stop Section */}
      <div className="p-4 rounded-md bg-gray-800/50 border border-gray-700/50 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="enableAutoStop" className={`text-gray-200 font-minecraft text-sm flex items-center gap-2 ${config.enableAutoPause ? "opacity-50" : ""}`}>
              <Image src="/images/redstone.webp" alt="Auto-Stop" width={16} height={16} />
              Habilitar Auto-Stop
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <p>Detiene automáticamente el servidor cuando no hay jugadores durante el tiempo especificado</p>
                  {config.enableAutoPause && <p className="text-red-400 mt-1">No se puede usar junto con Auto-Pause</p>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch id="enableAutoStop" checked={config.enableAutoStop || false} onCheckedChange={handleAutoStopChange} disabled={config.enableAutoPause} />
        </div>

        {config.enableAutoStop && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="space-y-2">
              <Label htmlFor="autoStopTimeoutInit" className="text-xs text-gray-300">
                Tiempo de inicio (segundos)
              </Label>
              <Input id="autoStopTimeoutInit" type="text" value={config.autoStopTimeoutInit || "300"} onChange={(e) => updateConfig("autoStopTimeoutInit", e.target.value)} className="bg-gray-800/70 border-gray-700/50 focus:ring-emerald-500/30" />
              <p className="text-xs text-gray-400">Tiempo de espera inicial para detener el servidor si no hay jugadores</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="autoStopTimeoutEst" className="text-xs text-gray-300">
                Tiempo establecido (segundos)
              </Label>
              <Input id="autoStopTimeoutEst" type="text" value={config.autoStopTimeoutEst || "300"} onChange={(e) => updateConfig("autoStopTimeoutEst", e.target.value)} className="bg-gray-800/70 border-gray-700/50 focus:ring-emerald-500/30" />
              <p className="text-xs text-gray-400">Tiempo de espera para detener el servidor una vez está en ejecución</p>
            </div>
          </div>
        )}
      </div>

      {/* Auto-Pause Section */}
      {/* Auto-Pause Section */}
      <div className="p-4 rounded-md bg-gray-800/50 border border-gray-700/50 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="enableAutoPause" className={`text-gray-200 font-minecraft text-sm flex items-center gap-2 ${config.enableAutoStop ? "opacity-50" : ""}`}>
              <Image src="/images/clock.webp" alt="Auto-Pause" width={16} height={16} />
              Habilitar Auto-Pause
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <p>Pausa automáticamente el servidor cuando no hay jugadores durante el tiempo especificado</p>
                  {config.enableAutoStop && <p className="text-red-400 mt-1">No se puede usar junto con Auto-Stop</p>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch id="enableAutoPause" checked={config.enableAutoPause || false} onCheckedChange={handleAutoPauseChange} disabled={config.enableAutoStop} />
        </div>

        {/* Warning about mod compatibility */}
        {config.enableAutoPause && (
          <div className="flex items-start gap-2 p-3 bg-amber-900/30 border border-amber-700/50 rounded">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-xs text-amber-200">
              <p className="font-medium">⚠️ Advertencia sobre compatibilidad con mods:</p>
              <p className="mt-1">Si el servidor tiene mods instalados, la función Auto-Pause puede causar problemas al intentar despertar el servidor. Algunos mods no son compatibles con esta característica y pueden provocar que el servidor se cuelgue o crashee durante el proceso de despertar. Se recomienda usar esta función solo en servidores Vanilla o probar cuidadosamente la compatibilidad antes de activarla en producción.</p>
            </div>
          </div>
        )}

        {config.enableAutoPause && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="space-y-2">
              <Label htmlFor="autoPauseTimeoutInit" className="text-xs text-gray-300">
                Tiempo de inicio (segundos)
              </Label>
              <Input id="autoPauseTimeoutInit" type="text" value={config.autoPauseTimeoutInit || "300"} onChange={(e) => updateConfig("autoPauseTimeoutInit", e.target.value)} className="bg-gray-800/70 border-gray-700/50 focus:ring-emerald-500/30" />
              <p className="text-xs text-gray-400">Tiempo de espera inicial para pausar el servidor si no hay jugadores</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="autoPauseTimeoutEst" className="text-xs text-gray-300">
                Tiempo establecido (segundos)
              </Label>
              <Input id="autoPauseTimeoutEst" type="text" value={config.autoPauseTimeoutEst || "300"} onChange={(e) => updateConfig("autoPauseTimeoutEst", e.target.value)} className="bg-gray-800/70 border-gray-700/50 focus:ring-emerald-500/30" />
              <p className="text-xs text-gray-400">Tiempo de espera para pausar el servidor una vez está en ejecución</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="autoPauseKnockInterface" className="text-xs text-gray-300">
                Interfaz de reconexión
              </Label>
              <Input id="autoPauseKnockInterface" type="text" value={config.autoPauseKnockInterface || "0.0.0.0"} onChange={(e) => updateConfig("autoPauseKnockInterface", e.target.value)} className="bg-gray-800/70 border-gray-700/50 focus:ring-emerald-500/30" />
              <p className="text-xs text-gray-400">Dirección IP para escuchar conexiones que despierten el servidor (0.0.0.0 para todas)</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 rounded-md bg-gray-800/50 border border-gray-700/50 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="enableRollingLogs" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
              <Image src="/images/paper.webp" alt="Logs Rotativos" width={16} height={16} />
              Habilitar Logs Rotativos
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <p>Por defecto, el archivo de registro vanilla crecerá sin límite. El registrador se puede reconfigurar para usar una estrategia de archivos de registro rotativa.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch id="enableRollingLogs" checked={config.enableRollingLogs || false} onCheckedChange={(checked) => updateConfig("enableRollingLogs", checked)} />
        </div>
        <p className="text-xs text-gray-400">Limita el tamaño de los archivos de log mediante rotación</p>
      </div>

      <div className="p-4 rounded-md bg-gray-800/50 border border-gray-700/50 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="logTimestamp" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
              <Image src="/images/daylight-detector.webp" alt="Tiempo en Logs" width={16} height={16} />
              Mostrar Hora en Logs
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <p>Incluye la marca de tiempo con cada log</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch id="logTimestamp" checked={config.logTimestamp || false} onCheckedChange={(checked) => updateConfig("logTimestamp", checked)} />
        </div>
        <p className="text-xs text-gray-400">Agrega marcas de tiempo en las entradas de los logs</p>
      </div>
    </>
  );
};
