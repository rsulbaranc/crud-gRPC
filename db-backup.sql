PGDMP     
                    {         	   productos    15.2    15.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24594 	   productos    DATABASE     �   CREATE DATABASE productos WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Argentina.1252';
    DROP DATABASE productos;
                postgres    false            �            1259    24595    producto    TABLE     ]   CREATE TABLE public.producto (
    id integer NOT NULL,
    descrip character varying(20)
);
    DROP TABLE public.producto;
       public         heap    postgres    false            �          0    24595    producto 
   TABLE DATA           /   COPY public.producto (id, descrip) FROM stdin;
    public          postgres    false    214   ,       e           2606    24599    producto pk_producto 
   CONSTRAINT     R   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT pk_producto PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.producto DROP CONSTRAINT pk_producto;
       public            postgres    false    214            �   %   x�3�LNLK�2�L�*MN,�2�L,*ʯ����� zu�     