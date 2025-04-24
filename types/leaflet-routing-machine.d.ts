declare module "leaflet-routing-machine" {
  import * as L from "leaflet";

  namespace Routing {
    function control(options: RoutingControlOptions): L.Control;

    interface RoutingControlOptions {
      waypoints?: L.LatLng[];
      router?: any;
      routeWhileDragging?: boolean;
      createMarker?: (
        i: number,
        waypoint: { latLng: L.LatLng },
        n: number
      ) => L.Marker | null;
    }

    function osrmv1(): any;
  }

  export = Routing;
}
