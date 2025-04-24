import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useMapStore from "@/store/useMapStore";
import useNavStore from "@/store/useNavStore";
import React from "react";

const DiscardModal = () => {
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
    <AlertDialog open={modal === "discard"}>
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
};

export default DiscardModal;
