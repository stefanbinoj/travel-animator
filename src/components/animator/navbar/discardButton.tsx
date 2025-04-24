import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useMapStore from "@/store/useMapStore";
import useNavStore from "@/store/useNavStore";
import { Trash } from "lucide-react";

export function AlertDialogDemo() {
  const setWayPoints = useMapStore((state) => state.setWayPoints);
  const setModal = useNavStore((state) => state.setModal);
  const modal = useNavStore((state) => state.modal);

  const handleDiscard = () => {
    setWayPoints([]);
    setModal(null);
  };

  const handleCancel = () => {
    setModal(null);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-[#2A2A2A]" asChild>
        <Button variant="outline">
          <Trash color="red" className="self-center" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard Route?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            current route and waypoints.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDiscard}>Discard</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
