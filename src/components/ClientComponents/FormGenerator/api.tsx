export const uploadActorInstanceFile = async (
    files: File[],
    targetPath: string
  ): Promise<{ status: number; responseData: any }> => {
    const formData = new FormData();
      files.forEach((file) => {
      formData.append('files', file); 
    });
  
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/actor_instances/upload/?target_path=${encodeURIComponent(
        targetPath
      )}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
        },
        body: formData,
      }
    );
  
    const responseData = await response.json();
    return { status: response.status, responseData };
  };