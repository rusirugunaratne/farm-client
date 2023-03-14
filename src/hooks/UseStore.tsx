import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createAPIEndpoint, ENDPOINTS } from "../api";

export default function useStore() {
  const queryClient = useQueryClient();
  // farm operations
  const {
    data: farms,
    isLoading: farmsLoading,
    refetch: farmsRefetch,
  } = useQuery(["farm"], () => {
    return createAPIEndpoint(ENDPOINTS.farm)
      .fetch()
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  });

  const updateFarm = (id: number, values: any) => {
    console.log(values);
    if (typeof values.hasBarge === "string") {
      values.hasBarge = values.hasBarge === "on" ? true : false;
    }
    createAPIEndpoint(ENDPOINTS.farm)
      .put(id, {
        id: id,
        name: values.name,
        latitude: values.latitude,
        longitude: values.longitude,
        image: values.image,
        hasBarge: values.hasBarge,
      })
      .then((res) => {
        queryClient.invalidateQueries(["farm"]);
        toast.success("Farm Updated Successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const createFarm = (values: any) => {
    createAPIEndpoint(ENDPOINTS.farm)
      .post({
        name: values.name,
        latitude: values.latitude,
        longitude: values.longitude,
        image: values.image,
        hasBarge: values.hasBarge === "on" ? true : false,
      })
      .then((res) => {
        queryClient.invalidateQueries(["farm"]);
        toast.success("Farm Created Successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const deleteFarm = (id: number) => {
    createAPIEndpoint(ENDPOINTS.farm)
      .delete(id)
      .then((res) => {
        queryClient.invalidateQueries(["farm"]);
        toast.success("Farm Deleted Successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        farmsRefetch();
      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const getFarmName = (id: number) => {
    return farms?.find((farm: any) => farm.id === id).name;
  };

  const getFarmId = (farmName: string) => {
    return farms?.find((farm: any) => farm.name === farmName).id;
  };

  //   worker operations
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
        toast.error(err, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  });

  const createWorker = (values: any) => {
    createAPIEndpoint(ENDPOINTS.worker)
      .post({
        name: values.name,
        age: values.age,
        farmId: getFarmId(values.farmName),
        email: values.email,
        position: values.position,
        certifiedUntil: values.certifiedUntil,
        image: values.image,
      })
      .then((res) => {
        queryClient.invalidateQueries(["worker"]);
        toast.success("Worker Added Successfuly !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const deleteWorker = (id: number) => {
    createAPIEndpoint(ENDPOINTS.worker)
      .delete(id)
      .then((res) => {
        queryClient.invalidateQueries(["worker"]);
        toast.success("Worker Deleted Successfuly !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        workersRefetch();
      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const updateWorker = (id: number, values: any) => {
    createAPIEndpoint(ENDPOINTS.worker)
      .put(id, {
        id: id,
        name: values.name,
        age: values.age,
        farmId: getFarmId(values.farmName),
        email: values.email,
        position: values.position,
        certifiedUntil: values.certifiedUntil,
        image: values.image,
      })
      .then((res) => {
        queryClient.invalidateQueries(["worker"]);
        toast.success("Worker Updated Successfuly !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      })
      .catch((err) => {
        toast.error(err, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  //   file operations
  const uploadFile = (formData: FormData) => {
    createAPIEndpoint(ENDPOINTS.fileUpload)
      .post(formData)
      .then((res) => {
        toast.success("File Uploaded Successfuly !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      })
      .catch((err) => {
        toast.error("File Uploaded Unsuccessful !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const isFarmNotEmpty = (farmId: number) => {
    let status = false;
    workers.forEach((worker: any) => {
      if (worker.farmId === farmId) {
        status = true;
      }
    });
    return status;
  };

  return {
    farms,
    farmsLoading,
    farmsRefetch,
    getFarmName,
    getFarmId,
    updateFarm,
    createFarm,
    deleteFarm,
    workers,
    workersLoading,
    workersRefetch,
    createWorker,
    deleteWorker,
    updateWorker,
    uploadFile,
    isFarmNotEmpty,
  };
}
