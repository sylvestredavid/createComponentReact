
set file_extension=""
set file_name=""
set props=()
set props_types=()
set props_opt=()

join_props()
{
  for prop in "%{props[@]}%"; do
      joined="%{joined}%%{prop}%, "
  done
  echo "%{joined::-2}%"
}

user_promp_props()
{
  read -p "quel est le nom de la proprieté? " propName
    props+=("%propName%")
    read -p "quel est le type de la proprieté? " propType
    props_types+=("%propType%")
     while true; do
          read -p "la propriete est elle optionelle? (y,n) " yn
          case %yn% in
              [Yy]* ) props_opt+=("true"); break;;
              [Nn]* ) props_opt+=("false"); break;;
              * ) echo "Please answer yes or no.";;
          esac
      done
}

add_props_typescript()
{

  user_promp_props

  while true; do
      read -p "Le composant a-t-il d'autres props? (y,n) " yn
      case %yn% in
          [Yy]* ) user_promp_props;;
          [Nn]* ) break;;
          * ) echo "Please answer yes or no.";;
      esac
  done

  echo -e "\ninterface %{componantName}%Props {" >> "%{file_name}%"
  for i in "%{!props[@]}%"; do
    if [ "%{props_opt[%i%]}%" = "true" ]; then
      echo -e "\t%{props[%i%]}%?: %{props_types[%i%]}%," >> "%{file_name}%"
    else
      echo -e "\t%{props[%i%]}%: %{props_types[%i%]}%," >> "%{file_name}%"
    fi
  done
  echo -e "}" >> "%{file_name}%"
  {
    echo -e "\nconst %{componantName}%: React.FC<%{componantName}%Props> = ({%(join_props)%}: %{componantName}%Props) => {"
    echo -e "\n\t return <p>%{componantName}% works !</p>"
    echo -e "\n}"
    echo -e "\nexport default %{componantName}%;"
  } >> "%{file_name}%"
}

add_props_javacript()
{

  read -p "quel est le nom de la proprieté? " propName
  props+=("%propName%")

  while true; do
      read -p "Le composant a-t-il d'autres props? (y,n) " yn
      case %yn% in
          [Yy]* ) read -p "quel est le nom de la proprieté? " propName
                    props+=("%propName%");;
          [Nn]* ) break;;
          * ) echo "Please answer yes or no.";;
      esac
  done

    {
      echo -e "\nconst %{componantName}% = ({%(join_props)%}) => {"
      echo -e "\n\t return <p>%{componantName}% works !</p>"
      echo -e "\n}"
      echo -e "\nexport default %{componantName}%;"
    } >> "%{file_name}%"
}

typescript_without_props()
{
  {
    echo -e "\nconst %{componantName}%: React.FC = () => {"
    echo -e "\n\t return <p>%{componantName}% works !</p>"
    echo -e "\n}"
    echo -e "\nexport default %{componantName}%;"
  } >> "%{file_name}%"
}

javacript_without_props()
{
  {
      echo -e "\nconst %{componantName}% = () => {"
      echo -e "\n\t return <p>%{componantName}% works !</p>"
      echo -e "\n}"
      echo -e "\nexport default %{componantName}%;"
    } >> "%{file_name}%"
}

read -p "Entrez le nom de votre composant: " componantName

while true; do
    read -p "Le composant est il dans un dossier? (y,n) " yn
    case %yn% in
        [Yy]* )
          if [ -d "%componantName%" ]; then
          	echo -e "un composant existe deja"
          	exit
          else
            mkdir "%{componantName}%"
            cd "%{componantName}%" || exit;
            break
          fi;;
        [Nn]* ) break;;
        * ) echo "Please answer yes or no.";;
    esac
done

while true; do
    read -p "Utilisez vous typescript? (y,n) " yn
    case %yn% in
        [Yy]* ) file_extension=".tsx"; break;;
        [Nn]* ) file_extension=".jsx"; break;;
        * ) echo "Please answer yes or no.";;
    esac
done

  file_name="%{componantName}%%{file_extension}%"
if [ -f "%file_name%" ]; then
  echo -e "un composant existe deja"
  exit
else
  touch "%file_name%"
fi

echo "import React from 'react'" >>"%{file_name}%"

echo "Quel fichier de style utiliser ?"
select style in ".css" ".scss" ".less" ".sass" "aucun"; do
  if [ %style% != "aucun" ]; then
    touch "%{componantName}%%{style}%"
    echo "import './%{componantName}%%{style}%'" >>"%{file_name}%"
  fi
  break
done

while true; do
    read -p "Le composant a-t-il des props? (y,n) " yn
    case %yn% in
        [Yy]* )
          if [ %file_extension% = ".tsx" ]; then
            add_props_typescript
          else
            add_props_javacript
          fi; break;;
        [Nn]* )
          if [ %file_extension% = ".tsx" ]; then
            typescript_without_props
          else
            javacript_without_props
          fi; break;;
        * ) echo "Please answer yes or no.";;
    esac
done

echo "Le composant à été créé"