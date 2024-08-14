import React, {useState} from "react";
import * as yup from "yup";
import {Box, Button, TextField, Typography} from "@mui/material";
import {PAGE_CONTENT_STYLE} from "../../theme/styleUtils";
import {Field, Form, Formik, FormikHelpers, FormikValues, getIn,} from "formik";
import {RED_PASTEL_COLOR} from "../../theme/paletteUtils";
import FileSystemTree from "../../components/tree/fileSystemTree";

interface RepositoryUrl {
  repositoryUrl: string,
  owner: string | null,
  repository: string | null
}

export interface RepositoryMetadata {
  owner: string
  repository: string,
  path?: string
}


function FileExplorerPage() {
  const [metadata, setMetadata] = useState<{
    owner: string | null,
    repository: string | null,
  }>({
       owner: null, repository: null
     })

  return (
    <Box
      key={"file-explorer-view"}
      sx={{
        ...PAGE_CONTENT_STYLE,
        flexDirection: "column",
        pt: "20px",
        gap: "20px",
        width: "100%",
        px: "50px"
      }}
    >
      <Formik
        initialValues={{repositoryUrl: "", owner: null, repository: null} as RepositoryUrl}
        validationSchema={yup.object({
                                       repositoryUrl: yup
                                         .string()
                                         .matches(
                                           /https:\/\/github\.com\/[^\/]+\/[^\/]+$/,
                                           "Repository url must be of the form https://github.com/{owner}/{repository}"
                                         )
                                         .required("Repository URL is required"),
                                     })}
        onSubmit={function (
          values: FormikValues,
          formikHelpers: FormikHelpers<FormikValues>
        ): void | Promise<any> {
          formikHelpers.setSubmitting(true);
          const rawMetadata: string = values.repositoryUrl.slice(19);

          // Remove the 'https://github.com/' part of the url
          rawMetadata.slice(19)
          const md = rawMetadata.split("/")

          const identifierParts: Pick<RepositoryMetadata, "repository" | "owner"> = {
            owner: md[0],
            repository: md[1],
          }
          if (!identifierParts.owner || !identifierParts.repository) {
            return
          }

          setMetadata(identifierParts)
        }}
      >
        {({
            errors,
            values,
            dirty,
            isValid,
            isSubmitting,
            touched,
            handleSubmit,
            handleChange
          }) => {


          return (
            <Box>
              <Form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Field
                    name="repositoryUrl"
                    as={TextField}
                    inputProps={{sx: {width: "400px"}}}
                    error={errors.repositoryUrl}
                    label="Github Repository Link"
                    value={values.repositoryUrl}
                    onChange={handleChange}
                  />
                  {touched.repositoryUrl &&
                    getIn(errors, "repositoryUrl", false) && (
                      <Box sx={{display: "flex", maxWidth: "400px"}}>
                        <Typography sx={{color: RED_PASTEL_COLOR}}>
                          {getIn(errors, "repositoryUrl", "")}
                        </Typography>
                      </Box>
                    )}
                  <Button
                    type="submit"
                    disabled={!isValid || !dirty}
                  >
                    {"Submit"}
                  </Button>
                </Box>
              </Form>
            </Box>
          );
        }}

      </Formik>
      {metadata.owner && metadata.repository &&
          <FileSystemTree owner={metadata.owner}
                          repository={metadata.repository}/>}
    </Box>
  );
}

export default FileExplorerPage;
