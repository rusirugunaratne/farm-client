import { useQuery } from "@tanstack/react-query";
import { createAPIEndpoint, ENDPOINTS } from "../api";

export {};

export default function useStore() {
  const {
    data: farms,
    isLoading: farmsLoading,
    refetch: farmsRefetch,
  } = useQuery(["farm"], () => {
    return createAPIEndpoint(ENDPOINTS.farm)
      .fetch()
      .then((res) => {
        console.log("inside table");
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleFarmDelete = (id: number) => {
    createAPIEndpoint(ENDPOINTS.farm)
      .delete(id)
      .then((res) => {
        console.log(res);
        farmsRefetch();
      })
      .catch((err) => console.log(err));
  };

  const getFarmName = (id: number) => {
    console.log(id, "Yes");
    return farms?.find((farm: any) => farm.id === id).name;
  };

  const getFarmId = (farmName: string) => {
    console.log(farmName, ": farm Name");
    return farms?.find((farm: any) => farm.name === farmName).id;
  };

  const {
    data: workers,
    isLoading: workersLoading,
    refetch: workersRefetch,
  } = useQuery(["worker"], () => {
    return createAPIEndpoint(ENDPOINTS.worker)
      .fetch()
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleWorkerDelete = (id: number) => {
    createAPIEndpoint(ENDPOINTS.worker)
      .delete(id)
      .then((res) => workersRefetch())
      .catch((err) => console.log(err));
  };

  return {
    farms,
    farmsLoading,
    farmsRefetch,
    getFarmName,
    getFarmId,
    handleFarmDelete,
    workers,
    workersLoading,
    workersRefetch,
    handleWorkerDelete,
  };
}
