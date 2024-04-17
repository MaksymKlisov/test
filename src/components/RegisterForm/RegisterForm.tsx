import {
    Box,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import style from './RegisterForm.module.scss'
import {ChangeEvent, useEffect, useRef, useState} from "react";
import CustomButton, {CustomButtonTheme} from "../../UI/button/CustomButton.tsx";
import {Controller, useForm,} from 'react-hook-form';
import {FormDataUser} from "../../entities/users/model/Users.ts";
import {emailPattern, phonePattern} from "../../helpers/patterns.ts";
import successfulRegistration from '../../assets/success-image.svg'
import axios from "axios";

const RegisterForm = () => {

    const {register, handleSubmit,
        control,
        watch,
        reset,
        formState: {errors}} = useForm<FormDataUser>();




    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null)
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef<HTMLDivElement>(null)
    const watchedFields = watch(['name', 'email', 'phone', 'position_id', 'photo']);

    useEffect(() => {
        const isNameValid = !errors.name;
        const isEmailValid = !errors.email;
        const isPhoneValid = !errors.phone;
        const isPositionValid = !errors.position_id;
        const isFileValid = !errors.photo;

        const formValid = isNameValid && isEmailValid && isPhoneValid && isPositionValid && isFileValid;

        setIsFormValid(formValid);
    }, [watchedFields,errors, isFormValid]);

    const scrollToElement = () => {
        ref.current?.scrollIntoView({
            behavior: 'smooth'
        });

    };

    const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const uploadedFile = e.target.files[0];

            if (uploadedFile.type.startsWith('image/')) {
                const img = new Image();
                img.onload = function () {
                    if (
                        (uploadedFile.type === 'image/jpeg' || uploadedFile.type === 'image/jpg' || uploadedFile.type === 'image/png') &&
                        img.width >= 70 &&
                        img.height >= 70 &&
                        uploadedFile.size <= 5 * 1024 * 1024
                    ) {
                        setFile(uploadedFile);
                    } else {
                        alert(
                            'Please upload an image in JPEG/JPG format with resolution at least 70x70px and size not exceeding 5MB.'
                        );
                    }
                };
                img.src = URL.createObjectURL(uploadedFile);
            } else {
                alert('Please upload an image file.');
            }
        }
    };

    const  getToken = async ():Promise<string>  => {

        try {
            const response = await axios.get("https://frontend-test-assignment-api.abz.agency/api/v1/token");
            return response.data.token;
        } catch (error) {
            console.error("Error when receiving a token:", error);
            throw error;
        }
    }

    const onSubmit = async (Data: FormDataUser) => {

        setIsLoading(true)

        if (!file) {
            alert('Please upload a photo.');
            setIsLoading(false);
            return;
        } else {
            Data.photo = file
        }

        console.log(Data)

        const token = await getToken();

        try {
            const response = await axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', Data, {
                headers: {
                    'Token': token,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const data = response.data;

            if (data.success) {
                setIsLoading(false)
                setRegistrationSuccess(true)
                setFile(null)
                reset()
                scrollToElement()

            } else {
                new Error("Error user registration");
                alert("Error user registration")
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error")
        }

    };


    return (
        <div
            id={'registerFormId'}
            className={style.WrapperForm}>
            <h2 className={style.RegisterFormHeader}>
                Working with POST request
            </h2>
            <form
                className={style.InputContainer} onSubmit={handleSubmit(onSubmit)}>

                <TextField
                    {...register("name", {required: true, minLength: 3, maxLength: 60})}
                    error={!!errors.name}
                    label={'Name'}
                    variant="outlined"
                    helperText={errors.name && 'minimum number of characters for a name 3 - 60'}
                >
                </TextField>

                <TextField
                    {...register("email", {required: true, pattern: emailPattern})}
                    error={!!errors.email}
                    label={'Email'}
                    variant="outlined"
                    helperText={errors.email && 'incorrect email'}
                >
                </TextField>

                <TextField
                    {...register("phone", {
                        required: true,
                        pattern: phonePattern
                    })}
                    error={!!errors.phone}
                    label={'Phone'}
                    variant="outlined"
                    helperText={!errors.phone ? '+38 (XXX) XXX - XX - XX' :
                        errors.phone && 'incorrect format, example: +38 (XXX) XXX - XX - XX'}
                >
                </TextField>

                <div className={style.RadioContainer}>
                    <FormControl
                        error={!!errors.position_id}>
                        <FormLabel id="radio-buttons-group-label">Select your position</FormLabel>

                        <Controller
                            rules={{required: true}}
                            control={control}
                            name={'position_id'}
                            defaultValue={''}
                            render={({field}) => (

                                <RadioGroup {...field}>
                                    <FormControlLabel
                                        value="1"
                                        control={<Radio/>}
                                        label="Security"/>

                                    <FormControlLabel
                                        value="2"
                                        control={<Radio/>}
                                        label="Designer"/>

                                    <FormControlLabel
                                        value="3"
                                        control={<Radio/>}
                                        label="Content manager"/>

                                    <FormControlLabel
                                        value="4"
                                        control={<Radio/>}
                                        label="Lawyer"/>
                                </RadioGroup>
                            )
                            }
                        />

                        <FormHelperText>{errors.position_id ? "This field is required" : ''}</FormHelperText>
                    </FormControl>
                </div>

                <div className={style.UploadContainer}>

                    <div className={style.UploadContainerInput}>

                        <input
                            type="text"
                            className={style.UploadInput}
                            readOnly={true}
                            value={'Upload'}
                        />

                        <input
                            className={style.FileInput}
                            {...register("photo", {required: true})}
                            onChange={handlePhotoUpload}
                            type='file'
                            id='fileInput'
                            accept={'image/*,.jpeg,.jpg'}
                        />
                    </div>
                    <label
                        htmlFor="fileInput"
                        className={style.UploadLabel}
                    >
                        <span>{file ? file.name : 'Upload your photo'}</span>
                    </label>
                </div>

                <div
                    className={style.UploadButtonWrapper}>
                    {!file && !isFormValid && <span className={style.ErrorInputColor}>please upload photo</span>  }
                </div>
                <CustomButton
                    type={'submit'}
                    className={style.UploadFormButton}
                    theme={isFormValid && !isLoading ?
                        CustomButtonTheme.NORMAL : CustomButtonTheme.DISABLED}
                    disabled={isLoading}
                >
                    Sing up
                </CustomButton>


                {registrationSuccess && <Box sx={{ alignItems: 'center', textAlign: 'center', marginLeft: -7}}>
                    <h3 className={style.RegisterFormHeader}>User successfully registered</h3>
                    <img  src={successfulRegistration} alt={"registration Success"}/>
                </Box>
                }

                <div  className={style.spacer}></div>

                {isLoading &&  <CircularProgress
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 auto',
                        my: 30,
                    }}
                    size={100} />}

                <div ref={ref} className={style.spacer}>test footer</div>

            </form>
        </div>
    );
};

export default RegisterForm;